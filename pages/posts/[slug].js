// pages/posts/[slug].js
import PostLayout from "../../_layouts/postjs";
import { getPostBySlug } from "../api/index";
import getAllPosts from "../api/index";

export default function Post(props) {
  console.log("props", props);
  return <PostLayout title={props.title} content={props.content} />;
}

export async function getStaticProps(context) {
  return {
    props: await getPostBySlug(context.params.slug),
  };
}

export async function getStaticPaths() {
  let paths = await getAllPosts();
  paths = paths.map((post) => ({
    params: { slug: post.slug },
  }));
  return {
    paths: paths,
    fallback: false,
  };
}
