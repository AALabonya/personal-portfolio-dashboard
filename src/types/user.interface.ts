export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: string;
  image?: string;
  followingShops?: string[];
  user?: any
};
export interface ISkill{
  _id: string;
  label: string;
  logo: string;
  expertise: string;
}


import { IconType } from "react-icons";
// NavItem interface
export interface NavItem {
    href: string;
    title: string;
    Icon: IconType;
    children?: NavItem[];
}
