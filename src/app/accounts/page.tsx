'use client'
import React, { useState } from 'react'

interface InstagramAccount {
  id: string;
  username: string;
  picture: string;
}

const Page = () => {
  const [accounts, setAccounts] = useState<InstagramAccount[] | null>(null)
  const accessToken: string = 'EAAV71LZB2tg0BOZB87264sW0Qp6CMVLZC1LzWHnf4lyZAGtZAVQ1x0dxDuD4m1HktRAp9FBZAwtbKZBF15wk7FN9bwCNI4BLhVjH0lZCpwqc7ysZAQ5XIMqywygUt26wIMXo1vdVe8gtP6SnDZCOCj14SyAZCmWIGvsZBhxGbphGMEOezQQqEAZAEyMnWneSiQiP35FyOsR0TLvQZD'

  const getInstagramAccounts = async () => {
    const fetchInstagramAccounts = async () => {
      try {
        const response = await fetch(`https://graph.facebook.com/v20.0/me/accounts?access_token=${accessToken}&fields=id,username,profile_picture_url`);
        const data = await response.json();
        setAccounts(data.data);
      } catch (error) {
        console.error('Error listing Instagram Accounts:', error);
      }
    };

    fetchInstagramAccounts();
  }
  
  return (
    <div>
      {accessToken !== '' &&  <div>
        <div>
          <button onClick={getInstagramAccounts}>Get Instagram Accounts</button>
        </div>
        {accounts && accounts.map((account) => <div>{account.id}</div>)}
      </div>}
    </div>
  )
}

export default Page