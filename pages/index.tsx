import Head from "next/head";
import getAllPosts from "./api/index";
/**
 * Import helpers and GetStaticProps type
 */
import { getGithubPreviewProps, parseJson } from "next-tinacms-github";
import { GetStaticProps } from "next";

import { usePlugin } from "tinacms";
import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from "react-tinacms-github";
import { InlineForm, InlineText } from "react-tinacms-inline";
import Link from "next/link";

export default function Home({ file }) {
  const formOptions = {
    label: "Home Page",
    fields: [{ name: "title", component: "text" }],
  };
  // Registers a JSON Tina Form
  const [data, form] = useGithubJsonForm(file, formOptions);
  usePlugin(form);
  useGithubToolbarPlugins();
  return (
    <div className="container">
      <Head>
        <title>Usman Haider</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <InlineForm form={form}>
        <h1>
          <InlineText name="title" />
        </h1>
      </InlineForm>
      <div>
        {file.allPosts.map((post) => (
          <p key={post.data.title}>
            <Link href={"/posts/" + post.slug}>
              <a>{post.data.title}</a>
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
}

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  const allPosts = await getAllPosts();

  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: "content/home.json",
      parse: parseJson,
    });
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: "content/home.json",
        data: (await import("../content/home.json")).default,
        allPosts: allPosts,
      },
    },
  };
};
