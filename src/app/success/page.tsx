
"use client"

import { addIgAccount } from "@/actions/instagram"
import { exchangeLongLivedToken, getAccountList } from "@/actions/instagramAPI"
import { Instagram } from "@prisma/client"
import { useEffect, useState } from "react"

interface TokenParam { 
  [key: string]: string | undefined
}

const Page = () => {
  const [params, setParams] = useState<TokenParam>({
    access_token: '',
    data_access_expiration_time: '',
    expires_in: '',
    long_lived_token: '',
  })
  const [accounts, setAccounts] = useState<IgBusinessAccount[]>([])
  /*
  access_token
  data_access_expiration_time
  expires_in
  long_lived_token
  */

 //http://localhost:3001/success#access_token=EAAV71LZB2tg0BO0mjsjd64yWiwxME3F25rDsso9pEr2YInTMeBZCeDogQW1d4KWBdGqNO7q6ZAZA2ls7dpxkAkk0XcbjSR4c0nNZCKKzce0BZBrsUMxtRsFQHs1M31rgzwKkKoNKik6UyZAqeoQz1MdL0W7yN1R0it1Kw1SPXIhnDiNLdizhEvDbTuAFfKZC0WnOlBuqYZAXdLGGsbID5ZAfvn0Y0nqo8pAqPD&data_access_expiration_time=1727962024&expires_in=5576&long_lived_token=EAAV71LZB2tg0BOxIqqIYy9HKkOn7ziFvmULxUcltW1EOlPO4R3lEYNq9zGufS397LN217sSHiZApdsFUwbW03z2f9Ma1vZB3m52f8r5YWKEjtOfzo08igOeGLX9cAZAAZAi3WET1v4CLNgQ2fmaPIV08RKkVSan4v9ji8YnJV9P4Wbq3h7T6C56uTF9tj32ILZBQmjXZCkZD

  useEffect(() => {
    const hash = window.location.hash;
    const queries = hash.substring(1, hash.length - 1).split("&")

    const responseParams: TokenParam = {}
    queries.forEach((q) => {
      const [key, value] = q.split("=")
      responseParams[key] = value;
    })

    setParams(responseParams)

    const getDetails = async () => {
      const longLivedToken = await exchangeLongLivedToken(responseParams?.access_token || '')
      const listAccounts: IgBusinessAccount[] = await getAccountList({accessToken: longLivedToken?.access_token || ''})
      
      setParams((oldValue) => {
        return {
          ...oldValue,
          long_lived_token: longLivedToken?.access_token || '',
        }
      })

      setAccounts(listAccounts)
    }

    getDetails()

  }, [])

  const addAccount = async (account: IgBusinessAccount) => {
    const data: Partial<Instagram> = {
      instagramId: account.id,
      username: account.username,
      fullName: account.name,
      profilePictureUrl: account.profile_picture_url,
      userId: 'cly8oljsh0000v7is9zh4onqu', 
      authToken: params.access_token || '',    
      expired: Number(params.data_access_expiration_time)  || 0,      
      longLiveToken: params.long_lived_token   || '' 
    }

    const saved = await addIgAccount(data)
  }

  return (
    <div className="dark:text-slate-300 light:text-slate-800">

      <h1>Instagram Account List</h1>

      <div className="card dark:bg-base-100 light:bg-white m-auto my-10 p-10">
        {accounts && accounts.map((account) => <div key={account.id}
            className="flex justify-start items-center gap-3"
          >
          <div>
            <img className="w-[50px] h-[50px] rounded-full" src={account.profile_picture_url} />
          </div>
          <div>
            <div>
              {account.username}
            </div>
            <div>
              {account.name}
            </div>
          </div>
          <div>
            <button onClick={() => addAccount(account)}>Connect</button>
          </div>
        </div>)}
      </div>
    </div>
  )
}

export default Page