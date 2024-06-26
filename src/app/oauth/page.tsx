'use client'
import FacebookLogin, { SuccessResponse } from "@greatsumini/react-facebook-login";

interface FacebookResponse {
  name: string;
  email: string;
  picture: {
    data: {
      url: string;
    };
  };
}

const oAuthPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined};
}) => {

  const responseFacebook = (response: SuccessResponse) : SuccessResponse => {
    console.log(response);
    // Handle the response here
    return response
  };

  return (
    <div>
      <FacebookLogin
        appId={'492789156539348'}
        autoLoad={true}
        fields="name,email,picture"
        scope="business_management"
        onSuccess={responseFacebook}
      />
    </div>
  )
}

export default oAuthPage