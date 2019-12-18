import { parse } from 'qs';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function setAuthority(payload: any) {
  let authority = payload.data.role[0].authority
  if(authority=="ROLE_ADMIN"){
    authority = "admin"
  }
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
  localStorage.setItem("user", payload.data.username);
  localStorage.setItem('token', payload.jwtToken);
}
