import { ID, Query } from 'appwrite';
import { config, databases, storage } from '@/lib/appwrite';
import { createSlug } from '@/lib/appwrite';
import type { Course, Lesson } from '@/lib/store/slices/courseSlice';
import { courseStatuses } from '@/lib/constants';

export const courseService = {
  // Get all published courses
  async getPublishedCourses(): Promise<Course[]> {
    try {
      const response = await databases.listDocuments(
        config.databaseId,
        config.coursesCollectionId,
        [Query.equal('status', courseStatuses.PUBLISHED)]
      );

      return response.documents as unknown as Course[];
    } catch (error) {
      console.error('Error getting published courses:', error);
      throw error;
    }
  },

  // Get featured courses
  async getFeaturedCourses(limit = 6): Promise<Course[]> {
    try {
      const response = await databases.listDocuments(
        config.databaseId,
        config.coursesCollectionId,
        [
          Query.equal('status', courseStatuses.PUBLISHED),
          Query.orderDesc('$createdAt'),
          Query.limit(limit)
        ]
      );

      return response.documents as unknown as Course[];
    } catch (error) {
      console.error('Error getting featured courses:', error);
      throw error;
    }
  },

  // Get course by ID
  async getCourseById(courseId: string): Promise<Course> {
    try {
      const course = await databases.getDocument(
        config.databaseId,
        config.coursesCollectionId,
        courseId
      );

      return course as unknown as Course;
    } catch (error) {
      console.error('Error getting course by ID:', error);
      throw error;
    }
  },

  // Get course by slug
  async getCourseBySlug(slug: string): Promise<Course> {
    try {
      const response = await databases.listDocuments(
        config.databaseId,
        config.coursesCollectionId,
        [Query.equal('slug', slug)]
      );

      if (response.documents.length === 0) {
        throw new Error('Course not found');
      }

      return response.documents[0] as unknown as Course;
    } catch (error) {
      console.error('Error getting course by slug:', error);
      throw error;
    }
  },

  // Get courses by category
  async getCoursesByCategory(category: string): Promise<Course[]> {
    try {
      const response = await databases.listDocuments(
        config.databaseId,
        config.coursesCollectionId,
        [
          Query.equal('status', courseStatuses.PUBLISHED),
          Query.equal('category', category)
        ]
      );

      return response.documents as unknown as Course[];
    } catch (error) {
      console.error('Error getting courses by category:', error);
      throw error;
    }
  },

  // Get lessons for a course
  async getCourseLessons(courseId: string): Promise<Lesson[]> {
    try {
      const response = await databases.listDocuments(
        config.databaseId,
        config.lessonsCollectionId,
        [
          Query.equal('courseId', courseId),
          Query.orderAsc('order')
        ]
      );

      return response.documents as unknown as Lesson[];
    } catch (error) {
      console.error('Error getting course lessons:', error);
      throw error;
    }
  },

  // Get lesson by ID
  async getLessonById(lessonId: string): Promise<Lesson> {
    try {
      const lesson = await databases.getDocument(
        config.databaseId,
        config.lessonsCollectionId,
        lessonId
      );

      return lesson as unknown as Lesson;
    } catch (error) {
      console.error('Error getting lesson by ID:', error);
      throw error;
    }
  },

  // Create a new course (admin only)
  async createCourse(courseData: Omit<Course, '$id' | 'slug' | 'createdAt' | 'updatedAt'>): Promise<Course> {
    try {
      const slug = createSlug(courseData.title);
      const now = new Date().toISOString();

      const newCourse = await databases.createDocument(
        config.databaseId,
        config.coursesCollectionId,
        ID.unique(),
        {
          ...courseData,
          slug,
          lessonsCount: 0,
          totalDuration: 0,
          createdAt: now,
          updatedAt: now,
        }
      );

      return newCourse as unknown as Course;
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  },

  // Update a course (admin only)
  async updateCourse(courseId: string, courseData: Partial<Course>): Promise<Course> {
    try {
      const updatedCourse = await databases.updateDocument(
        config.databaseId,
        config.coursesCollectionId,
        courseId,
        {
          ...courseData,
          updatedAt: new Date().toISOString(),
        }
      );

      return updatedCourse as unknown as Course;
    } catch (error) {
      console.error('Error updating course:', error);
      throw error;
    }
  },

  // Delete a course (admin only)
  async deleteCourse(courseId: string): Promise<void> {
    try {
      // Delete all lessons for this course
      const lessons = await this.getCourseLessons(courseId);
      for (const lesson of lessons) {
        await this.deleteLesson(lesson.$id);
      }

      // Delete the course
      await databases.deleteDocument(
        config.databaseId,
        config.coursesCollectionId,
        courseId
      );
    } catch (error) {
      console.error('Error deleting course:', error);
      throw error;
    }
  },

  // Create a new lesson (admin only)
  async createLesson(lessonData: Omit<Lesson, '$id'>): Promise<Lesson> {
    try {
      const newLesson = await databases.createDocument(
        config.databaseId,
        config.lessonsCollectionId,
        ID.unique(),
        lessonData
      );

      // Update course lesson count and total duration
      const course = await this.getCourseById(lessonData.courseId);
      await this.updateCourse(lessonData.courseId, {
        lessonsCount: course.lessonsCount + 1,
        totalDuration: course.totalDuration + lessonData.duration,
      });

      return newLesson as unknown as Lesson;
    } catch (error) {
      console.error('Error creating lesson:', error);
      throw error;
    }
  },

  // Update a lesson (admin only)
  async updateLesson(lessonId: string, lessonData: Partial<Lesson>): Promise<Lesson> {
    try {
      // If duration is updated, get the old lesson to calculate the difference
      let durationDifference = 0;
      if ('duration' in lessonData) {
        const oldLesson = await this.getLessonById(lessonId);
        durationDifference = (lessonData.duration || 0) - oldLesson.duration;
      }

      const updatedLesson = await databases.updateDocument(
        config.databaseId,
        config.lessonsCollectionId,
        lessonId,
        lessonData
      );

      // If duration changed, update course total duration
      if (durationDifference !== 0) {
        const course = await this.getCourseById(updatedLesson.courseId);
        await this.updateCourse(updatedLesson.courseId, {
          totalDuration: course.totalDuration + durationDifference,
        });
      }

      return updatedLesson as unknown as Lesson;
    } catch (error) {
      console.error('Error updating lesson:', error);
      throw error;
    }
  },

  // Delete a lesson (admin only)
  async deleteLesson(lessonId: string): Promise<void> {
    try {
      const lesson = await this.getLessonById(lessonId);

      // Delete lesson
      await databases.deleteDocument(
        config.databaseId,
        config.lessonsCollectionId,
        lessonId
      );

      // Update course lesson count and total duration
      const course = await this.getCourseById(lesson.courseId);
      await this.updateCourse(lesson.courseId, {
        lessonsCount: Math.max(0, course.lessonsCount - 1),
        totalDuration: Math.max(0, course.totalDuration - lesson.duration),
      });
    } catch (error) {
      console.error('Error deleting lesson:', error);
      throw error;
    }
  },

  // Upload course thumbnail
  async uploadCourseThumbnail(file: File): Promise<string> {
    try {
      const response = await storage.createFile(
        config.storageId,
        ID.unique(),
        file
      );

      const fileUrl = storage.getFileView(
        config.storageId,
        response.$id
      );

      return fileUrl.href;
    } catch (error) {
      console.error('Error uploading course thumbnail:', error);
      throw error;
    }
  },

  // Upload lesson video
  async uploadLessonVideo(file: File): Promise<string> {
    try {
      const response = await storage.createFile(
        config.storageId,
        ID.unique(),
        file
      );

      const fileUrl = storage.getFileView(
        config.storageId,
        response.$id
      );

      return fileUrl.href;
    } catch (error) {
      console.error('Error uploading lesson video:', error);
      throw error;
    }
  },

  // Search courses
  async searchCourses(query: string): Promise<Course[]> {
    try {
      const response = await databases.listDocuments(
        config.databaseId,
        config.coursesCollectionId,
        [
          Query.equal('status', courseStatuses.PUBLISHED),
          Query.search('title', query)
        ]
      );

      return response.documents as unknown as Course[];
    } catch (error) {
      console.error('Error searching courses:', error);
      throw error;
    }
  },
};
