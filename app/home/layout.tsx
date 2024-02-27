"use client";
import styles from "@/styles/home.module.scss"
import React, { useEffect, useState } from 'react';
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import CreatePost from '@/app/components/CreatePost';
import NavLinks from '@/app/components/ui/navlinks'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession();



  if (session) return (
    <html lang="en">
      <body className={styles.main}>
        <div className={styles.left}>
          <div className={styles.logo}></div>
          <div className={styles.category}>
            <NavLinks/>
          </div>
          <div className={styles.user}>
            <div className={styles.pi}>{session.user?.image && (
                <Image fill={true} src={session.user.image} alt="Profile image" style={{borderRadius: '50%' }} />
              )}</div>
              <div className={styles.pn}>{session.user?.name}</div>
              <button className={styles.logout} onClick={() => signOut()}>Sign out</button>
          </div>
        </div>
        <div className={styles.center}>
        {children}
        </div>
        <div className={styles.right}>
          <div className={styles.input}>
          <CreatePost/>
          </div>
        </div>
      </body>
    </html>
  )
}