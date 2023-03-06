import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export async function getLesson({ params }) {
  const variables = { lesson: params.lesson };
  const query = `
  query getLesson($lesson: String!) {
    lessonCollection(where: {slug: $lesson}  ) {
      items {
        slug
        title
   main {
    json
  }
        tags 
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

export default async function Lesson(props) {
  const demoParam = {
    params: {
      slug: `${props.params.topic}`,
      lesson: `${props.params.lesson}`,
    },
  };

  const data = await getLesson(demoParam);

  console.log("props", props.params);

  //according to the slug go get the lessons
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <Link href={`/${props.params.topic}`}>
          Back to {props.params.topic}
        </Link>

        {data.props.lesson.map((lesson) => (
          <div key={lesson}>
            <h1> {lesson.title} </h1>

            {documentToReactComponents(lesson.main.json)}
          </div>
        ))}
      </div>
    </main>
  );
}
