const domain = import.meta.env.CMS_DOMAIN;
const apiUrlPost = `${domain}/wp-json/wp/v2`;

export const getPostInfo = async (slug: string) => {
  const res = await fetch(`${apiUrlPost}/posts?slug=${slug}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch page info for slug: ${slug}`);
  }

  
  const [data] = await res.json();
  const { title: { rendered: title }, content: { rendered: content } } = data;

  return { title, content };
};

export const getPosts = async ({ perPage = 4 }: { perPage?: number } = {}) => {
  const res = await fetch(`${apiUrlPost}/posts?per_page=${perPage}&_embed`);

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await res.json();

  const posts = data.map((post) => {
    const {
      title: { rendered: title },
      content: { rendered: content },
      excerpt: { rendered: excerpt },
      date,
      slug,
    } = post;

    const featureImage =
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

    return { title, content, excerpt, date, slug, featureImage };
  });

  // console.log(posts);
  return posts;
};

type Category = "edu" | "kai" | "zen";
type Tag = "iniciativa" | "colaboracion" | "noticia";

const CATEGORY_MAP: Record<Category, number> = {
  edu: 3,
  kai: 4,
  zen: 5,
};

const TAG_MAP: Record<Tag, number> = {
  iniciativa: 9,
  colaboracion: 10,
  noticia: 11,
};

export const getPostsByCategories = async ({
  categoria,
  tag,
  perPage = 6,
}: {
  categoria: Category;
  tag: Tag;
  perPage?: number;
}) => {
  const categoryId = CATEGORY_MAP[categoria];
  const tagId = TAG_MAP[tag];

  const res = await fetch(
    `${apiUrlPost}/posts?categories=${categoryId}&tags=${tagId}&_embed`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await res.json();

  return data.map((post: any) => ({
    title: post.title.rendered,
    excerpt: post.excerpt.rendered,
    content: post.content.rendered,
    date: post.date,
    slug: post.slug,
    featureImage:
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null,
    categories: post.categories ?? [],
    tags: post.tags ?? [],
  }));
};
