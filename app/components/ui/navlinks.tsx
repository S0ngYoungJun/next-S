"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/styles/navlink.module.scss"

const links = [
  { name: "전자기기", href: "/test1"},
  { name: "건강/운동", href: "/test2" },
  { name: "게임", href: "/test3" },
  { name: "교육", href: "/test4" },
  { name: "엔터테이먼트", href: "/test4" },
  { name: "패션", href: "/test5" },

];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={`${styles.linkbox} ${
            pathname === link.href ? styles.activeLink : ""
          }`}
        >
          <p className={styles.linkname}>{link.name}</p>
        </Link>
      ))}
    </>
  );
}