import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./NavBar.module.css";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function NavBar({ data }) {
  return (
    <>
      <div className={styles.navProgress}></div>
      <div className={styles.navBarBox}>
        <div className={styles.navBar}>
          <Link className={styles.logoBox} href={"/"}>
            <Image
              className={styles.logo}
              height="90"
              width="90"
              src="/logo.gif"
              alt="logo"
            ></Image>
            <h1 className={styles.logoText}>ewecandoit</h1>
          </Link>
        </div>
        <div className={styles.navLaneOuter}>
          <ul className={styles.navLane}>
            {data && (
              <>
                {data?.map((i) => (
                  <Link
                    className={styles.navLink}
                    key={i.slug}
                    href={`/${i.slug}`}
                  >
                    <h1>{i.title}</h1>
                  </Link>
                ))}
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
