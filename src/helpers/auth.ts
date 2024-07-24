import { conf } from "./http";
import { links, unsecureLinks } from "./links";
import { supabase } from "./supabase";


export const updateUserInfo = ({
  data
}: { data: any }) => {
  if (data && data.session) {
    localStorage.setItem('jwt', data.session.access_token);
    localStorage.setItem('session', JSON.stringify(data.session));
    localStorage.setItem('user', JSON.stringify(data.user));
  }
}
export const login = async (
  { username, password }: { username: string, password: string }
) => {

  let { data, error } = await supabase.auth.signInWithPassword({
    email: username,
    password,
  })

  if (error) {
    console.log('b', error)
  }

  updateUserInfo({ data });
  return data
}

export const isAllowedUnsecureLink = (link: string) => {
  return unsecureLinks.includes(link);
}

export const redirectIfUnsecure = ({ location: { pathname }, navigate }: { location: any, navigate: any }) => {
  if ((!localStorage.jwt) && (!isAllowedUnsecureLink(pathname))) {
    navigate(links.user.signin);
  }
}