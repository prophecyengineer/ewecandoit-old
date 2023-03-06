import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import Link from "next/link";

//runs during build time and generates the paths
export async function generateStaticParams<StaticParams>() {
  // export async function getStaticPaths(topic: string) {
  const query = `query {
  topicCollection {
    items {
      slug
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

  const slugs = response.data.topicCollection.items.map(({ slug }: any) => {
    return { topic: slug };
  });

  return slugs;
}

async function getLessons({ params }: any) {
  const variables = { slug: params.slug };
  const query = `query getLessons($slug: [String]!){
    lessonCollection(where: {tags_contains_some: $slug}) {
     items {
      title
      slug
      main {
        json
      }
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
      body: JSON.stringify({ query, variables }),
    }
  ).then((response) => response.json());

  return {
    props: {
      lesson: response.data.lessonCollection.items,
    },
  };
}

interface Lesson {
  slug: string;
  title: string;
}

export default async function Topics(props: any) {
  const demoParam = { params: { slug: `${props.params.topic}` } };
  const data = await getLessons(demoParam);

  //according to the slug go get the lessons

  return (
    <main className={styles.main}>
      <div>
        <h1> {props.params.topic} </h1>

        {data.props.lesson.map((lesson: Lesson) => (
          <Link key={lesson.slug} href={`${props.params.topic}/${lesson.slug}`}>
            <h3> {lesson.title} </h3>
          </Link>
        ))}
      </div>
    </main>
  );
}
