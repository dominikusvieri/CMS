import { http, HttpResponse } from "msw";
import type {
  Post,
  PostCreate,
  PostUpdate,
} from "../types/post";

let posts: Post[] = [
  {
    id: 1,
    title: "Metrodata",
    content: "PT Metrodata Electronics Tbk adalah sebuah perusahaan teknologi informasi yang berkantor pusat di Jakarta. Untuk mendukung kegiatan bisnisnya, hingga akhir tahun 2021, perusahaan ini memiliki tujuh kantor cabang yang terletak di Bekasi, Medan, Bandung, dan Semarang, Yogyakarta, Surabaya, dan Makassar.",
    language: "en",
    status: "published",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Synnex Metrodata",
    content: "PT Synnex Metrodata Indonesia bergerak di bidang distribusi produk dan layanan Teknologi Informasi dan Komunikasi (TIK), menjadi distributor TIK terbesar di Indonesia yang juga menyediakan solusi digital lengkap seperti cloud, keamanan siber, big data, dan AI untuk mendukung transformasi digital di berbagai sektor. Mereka bermitra dengan perusahaan teknologi global terkemuka untuk mendistribusikan hardware, software, dan layanan, melayani lebih dari 6.000 channel partners di seluruh Indonesia. ",
    language: "id",
    status: "draft",
    createdAt: new Date().toISOString(),
  },
];

export const postHandlers = [
  http.get("/posts", ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("_page") || 1);
    const limit = Number(url.searchParams.get("_limit") || 5);
    const search = url.searchParams.get("q");
    const language = url.searchParams.get("language");
    const status = url.searchParams.get("status");

    let filtered = [...posts];

    if (search) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (language) {
      filtered = filtered.filter((p) => p.language === language);
    }

    if (status) {
      filtered = filtered.filter((p) => p.status === status);
    }

    const start = (page - 1) * limit;
    const end = start + limit;

    return HttpResponse.json(filtered.slice(start, end), {
      headers: {
        "x-total-count": filtered.length.toString(),
      },
    });
  }),

  http.get("/posts/:id", ({ params }) => {
    const post = posts.find((p) => p.id === Number(params.id));

    if (!post) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }

    return HttpResponse.json(post);
  }),

  http.post("/posts", async ({ request }) => {
    const body = (await request.json()) as PostCreate;

    const newPost: Post = {
      id: Date.now(),
      ...body,
      createdAt: new Date().toISOString(),
    };

    posts.unshift(newPost);

    return HttpResponse.json(newPost, { status: 201 });
  }),

  http.put("/posts/:id", async ({ request, params }) => {
    const body = (await request.json()) as PostUpdate;
    const id = Number(params.id);

    posts = posts.map((p) =>
      p.id === id ? { ...p, ...body } : p
    );

    return HttpResponse.json({ success: true });
  }),


  http.delete("/posts/:id", ({ params }) => {
    const id = Number(params.id);
    posts = posts.filter((p) => p.id !== id);

    return HttpResponse.json({ success: true });
  }),
];
