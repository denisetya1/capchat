'use server'

import { getDetailInstagramByIgId } from "./instagram";

const FB_GRAPH_BASE_URL = 'https://graph.facebook.com/v20.0/'
const FB_APP_ID = '1543528563258893'
const FB_APP_SECRET = 'ef631f3421c597da113da0129b5af67a'

export const exchangeLongLivedToken = async (accessToken: string) => {
  'use server'
  const response = await fetch(`${FB_GRAPH_BASE_URL}oauth/access_token?fb_exchange_token=${accessToken}&grant_type=fb_exchange_token&client_id=${FB_APP_ID}&client_secret=${FB_APP_SECRET}`);
  const data = await response.json();

  /*{
    "access_token":"{long-lived-user-access-token}",
    "token_type": "bearer",
    "expires_in": 5183944            //The number of seconds until the token expires
  }*/

  if(response.ok){
    return data
  } else {
    console.log(data)
  }
 
  return {}
}

export const getAccountList = async ({accessToken}: {accessToken: string}) => {
  'use server'
  const response = await fetch(`${FB_GRAPH_BASE_URL}me/accounts?access_token=${accessToken}&fields=id,username,profile_picture_url,name,instagram_business_account{id,ig_id,name,username,profile_picture_url}`);
  const data = await response.json();

  if(response.ok){
    const igBusinessAccunts: IgBusinessAccount[] = []

    data.data.map((fbPage: any) => {
      igBusinessAccunts.push(fbPage.instagram_business_account)
    })

    return igBusinessAccunts;
  } else {
    console.log(data)
  }
 
  return []
}

export const getMediaList = async (instagramId: string) => {
  'use server'

  const ig = await getDetailInstagramByIgId(instagramId)
  // console.log('ig', ig, instagramId)

  if(ig) {
    const response = await fetch(`https://graph.facebook.com/${ig.instagramId}/media?fields=id,media_type,media_url,permalink,thumbnail_url,timestamp,username,like_count,comments_count,caption`, {
      headers: {
        Authorization: `Bearer ${ig.longLiveToken}`
      }
    })
    const res = await response.json()

    if(response.ok){

      return res
    } else {
      console.log(res)

      return []
    }
  }

  return []
}