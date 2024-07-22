'use server'

import { PrismaClient } from "@prisma/client";

const USER_ID = 'cly8oljsh0000v7is9zh4onqu'

export const getAutomationTriggerById = async (id: string) => {
  const prisma = new PrismaClient();
  const automationTrigger = await prisma.automationTrigger.findFirst({
    where: {
      id
    }
  })

  return automationTrigger
}

export const getAutomationTriggerList = async () => {
  const prisma = new PrismaClient();
  const automationTriggers = await prisma.automationTrigger.findMany({
    where: {
      automationId: USER_ID
    }
  })

  return automationTriggers
}

export const upsertAutomationTrigger = async (data: AutomationTriggerDTO) => {
  const prisma = new PrismaClient();
  
  const automationTrigger = await prisma.automationTrigger.upsert({
    where: {
      id: data?.id || '0000'
    },
    update: {
      automationId: data.automationId,
      automationTriggerTypeId: data.automationTriggerTypeId,
      ...(data.mediaId ? {mediaId: data.mediaId} : {}),
      ...(data.isAll ? {isAll: data.isAll} : {}),
      ...(data.title ? {title: data.title} : {}),
      ...(data.keyword ? {keyword: data.keyword} : {}),
      ...(data.isExact ? {isExact: data.isExact} : {}),
      ...(data.autoLike ? {autoLike: data.autoLike} : {}),
      ...(data.isNoReply ? {isNoReply: data.isNoReply} : {}),
      ...(data.replies ? {replies: data.replies} : {}),
      ...(data.isActive ? {isActive: data.isActive} : {}),
      ...(data.runCount ? {runCount: data.runCount} : {}),
      ...(data.ctrCount? {ctrCount: data.ctrCount} : {})
    },
    create: {
      automationId: data.automationId,
      automationTriggerTypeId: data.automationTriggerTypeId,
      ...(data.mediaId ? {mediaId: data.mediaId} : {}),
      ...(data.isAll ? {isAll: data.isAll} : {}),
      title: data.title,
      ...(data.keyword ? {keyword: data.keyword} : {}),
      ...(data.isExact ? {isExact: data.isExact} : {}),
      ...(data.autoLike ? {autoLike: data.autoLike} : {}),
      ...(data.isNoReply ? {isNoReply: data.isNoReply} : {}),
      ...(data.replies ? {replies: data.replies} : {}),
      ...(data.isActive ? {isActive: data.isActive} : {}),
      runCount: 0,
      ctrCount: 0
    }
  })

  return automationTrigger
}

export const deleteAutomationTrigger = async (id: string) => {
  const prisma = new PrismaClient();

  return prisma.automationTrigger.delete({
    where: {
      id
    }
  })
} 