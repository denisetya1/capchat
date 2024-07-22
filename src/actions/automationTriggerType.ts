'use server'

import { PrismaClient } from "@prisma/client";

export const getAutomationTriggerTypeById = async (id: string) => {
  const prisma = new PrismaClient();
  const automationTriggerType = await prisma.automationTriggerType.findFirst({
    where: {
      id: Number(id)
    },
    select: {
      id:true,
      code: true,
      title: true,
      description: true,
      updatedAt: true,
      createdAt: true,
    }
  })

  return automationTriggerType
}

export const getAutomationTriggerTypeList = async () => {
  const prisma = new PrismaClient();
  const automationTriggerTypes = await prisma.automationTriggerType.findMany({
    select: {
      id:true,
      code: true,
      title: true,
      description: true,
      updatedAt: true,
      createdAt: true,
    }
  })

  return automationTriggerTypes
}