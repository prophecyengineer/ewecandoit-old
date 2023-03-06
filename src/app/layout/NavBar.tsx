import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./NavBar.module.css";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

// old way in Next.js...
// export async function getStaticPaths(topic: string) {
async function getTopics() {
  const query = `query {
  topicCollection {
    items {
      slug
      image
      title
    }
  }
}`;

  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/master`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json());

  const topics = response.data.topicCollection.items;
  return topics;
}

export default async function NavBar() {
  const data = await getTopics();

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
            ></Image>
            <h1 className={styles.logoText}>ewecandoit</h1>
          </Link>
        </div>
        <div className={styles.navLaneOuter}>
          <ul className={styles.navLane}>
            {data?.map((i) => (
              <Link className={styles.navLink} key={i.slug} href={`/${i.slug}`}>
                <h1>{i.title}</h1>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
