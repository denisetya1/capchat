'use server'

import { PrismaClient } from "@prisma/client";

const USER_ID = 'cly8oljsh0000v7is9zh4onqu'

export const getAutomationById = async (id: string) => {
  const prisma = new PrismaClient();
  const automation = await prisma.automation.findFirst({
    where: {
      userId: USER_ID,
      id
    },
    select: {
      id:true,
      title: true,
      updatedAt: true,
      createdAt: true,
      isActive: true,
      automationTriggers: {
        select: {
          id: true,
          title: true,
          instagramId: true,
          instagram: {
            select: {
              username: true
            }
          },
          postId: true,
          postCaption: true,
          postType: true,
          postThumbnailUrl: true,
          postPermalink: true,
          postTimestamp: true,
          isAllPost: true,
          isAllComment: true,
          replies: true,
          runCount: true,
          ctrCount: true,
          isActive: true,
        }
      }
    }
  })

  return automation
}

export const getAutomationList = async () => {
  const prisma = new PrismaClient();
  const automations = await prisma.automation.findMany({
    where: {
      userId: USER_ID
    },
    select: {
      id:true,
      title: true,
      updatedAt: true,
      createdAt: true,
      isActive: true,
      automationTriggers: {
        select: {
          id: true,
          title: true,
          instagramId: true,
          instagram: {
            select: {
              username: true
            }
          },
          postId: true,
          postCaption: true,
          postType: true,
          postThumbnailUrl: true,
          postPermalink: true,
          postTimestamp: true,
          runCount: true,
          ctrCount: true,
          isActive: true,
        }
      }
    }
  })

  return automations
}

export const createAutomation = async () => {
  const prisma = new PrismaClient();
  const automation = await prisma.automation.create({
    data: {
      title: "Untitled",
      userId: USER_ID
    }
  })

  return automation
}

export const deleteAutomationById = async (id: string) => {
  const prisma = new PrismaClient();
  const automation = await prisma.automation.delete({
    where: {
      id
    }
  })

  return automation
}