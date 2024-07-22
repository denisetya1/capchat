'use server';

import { Instagram, PrismaClient } from "@prisma/client";

export const getDetailInstagramByIgId = async (instagramId: string) => {
  const prisma = new PrismaClient();
  const instagram = await prisma.instagram.findUnique({
    where: {
      instagramId
    }
  })

  return instagram
}

export const getListInstagram = async () => {
  const prisma = new PrismaClient();
  const instagrams = await prisma.instagram.findMany({
    orderBy: {
      id: 'asc'
    }
  })

  return instagrams
}

export const getListAccountByUserId = async (userId: string) => {
  const prisma = new PrismaClient();
  const instagrams = await prisma.instagram.findMany({
    where: {
      userId
    },
    orderBy: {
      id: 'asc'
    }
  })

  return instagrams
}

export const addIgAccount = async (data: Instagram) => {
  'use server';

  const prisma = new PrismaClient();
  
  const instagrams = prisma.instagram.upsert({
    where: {
      instagramId: data.instagramId
    },
    update: {
      instagramId: data.instagramId,
      username: data.username,
      fullName: data.fullName,
      profilePictureUrl: data.profilePictureUrl,
      userId: data.userId, 
      authToken: data.authToken,    
      expired: data.expired,      
      longLiveToken: data.longLiveToken  
    },
    create: {
      instagramId: data.instagramId,
      username: data.username,
      fullName: data.fullName,
      profilePictureUrl: data.profilePictureUrl,
      userId: data.userId, 
      authToken: data.authToken,    
      expired: data.expired,      
      longLiveToken: data.longLiveToken  
    }
  })

  return instagrams
}