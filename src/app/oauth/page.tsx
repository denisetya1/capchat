"use client"
import FacebookLogin, { SuccessResponse } from "@greatsumini/react-facebook-login";
import { useState } from "react";

interface FacebookResponse {
  name: string;
  email: string;
  picture: {
    data: {
      url: string;
    };
  };
}

interface InstagramAccount {
  id: string;
  username: string;
  picture: string;
}

const oAuthPage = () => {
  const [accounts, setAccounts] = useState<InstagramAccount[] | null>(null)
  const [accessToken, setAccesstoken] = useState('')
  const [userId, setUserId] = useState('')

  const responseFacebook = (response: SuccessResponse) : SuccessResponse => {
    console.log(response);
    setAccesstoken(response.accessToken)
    setUserId(response.userID)

    // Handle the response here
    return response
  };

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
      <h1>OAUTH</h1>
     
     <div>
      <a href={`https://www.facebook.com/v20.0/dialog/oauth?client_id=1543528563258893&display=page&extras={"setup":{"channel":"IG_API_ONBOARDING"}}&redirect_uri=http://localhost:3001/success/&response_type=token&scope=instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement`}>
        Login FB
      </a>
     </div>
     {/* {accessToken === '' && <FacebookLogin
        appId={'1543528563258893'}
        autoLoad={true}
        fields="name,email,picture"
        scope="business_management,instagram_basic,pages_show_list,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,instagram_manage_messages"
        onSuccess={responseFacebook}
      /> }
      {accessToken !== '' &&  <div>
        <div>
          <button onClick={getInstagramAccounts}>Get Instagram Accounts</button>
        </div>
        {accounts && accounts.map((account) => <div>{account.username}</div>)}
      </div>} */}

    </div>
  )
}

export default oAuthPage