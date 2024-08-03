import { conf } from "./http";
import { links, unsecureLinks } from "./links";
import { supabase } from "./supabase";


export const updateUserInfo = ({
  data
}: { data: any }) => {
  if (data && data.jwt) {
    localStorage.setItem('jwt', data.jwt);
    localStorage.setItem('userId', JSON.stringify(data.userId));
  }
}
export const login = async (
  { username, password }: { username: string, password: string }
) => fetch(conf.auth.signin + `?email=${username}&password=${password}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    updateUserInfo({ data });
    return data;
  })

export const isAllowedUnsecureLink = (link: string) => {
  return unsecureLinks.includes(link);
}

export const redirectIfUnsecure = ({ location: { pathname }, navigate }: { location: any, navigate: any }) => {
  if ((!localStorage.jwt) && (!isAllowedUnsecureLink(pathname))) {
    navigate(links.user.signin);
  }
}