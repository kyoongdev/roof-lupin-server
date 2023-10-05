import { PrismaClient } from '@prisma/client';

export const seedAnnouncement = async (database: PrismaClient) => {
  for (let i = 0; i < 10; i++) {
    await database.announcement.create({
      data: {
        title: `공지사항 ${i}`,
        content: `<p>공지사항 ${i} 내용<p/>`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
};
