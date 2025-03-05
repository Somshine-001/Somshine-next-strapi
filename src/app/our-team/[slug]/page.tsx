import qs from "qs";

import { BlockRenderer, TeamPageBlock } from "../../component/blocks";
import { fetchApi } from "@/app/utils/fetch";

async function getTeamMember(slug: string) {
  const res = (await fetchApi(
    "/api/team-members",
    {},
    {
      photo: {
        fields: ["alternativeText", "name", "url"],
      },
      blocks: {
        on: {
          "blocks.testimonial": {
            populate: {
              photo: {
                fields: ["alternativeText", "name", "url"],
              },
            },
          },
          "blocks.spoiler": {
            populate: true,
          },
          "blocks.rich-text": {
            populate: true,
          },
        },
      },
    },
    {
      slug: {
        $eq: slug, // This is the slug for our team member
      },
    }
  )) as any;
  if (res) {
    if (res.status === 200) {
      return res.data?.data[0];
    }
  }
  return res.data?.data[0];
}

interface UserProfile {
  id: number;
  documentId: string;
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  photo: {
    id: number;
    alternativeText: string;
    name: string;
    url: string;
  };
  blocks: TeamPageBlock[];
}

export default async function TeamMemberDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) return <p>No member found</p>;

  const teamMember = (await getTeamMember(slug)) as UserProfile;

  return (
    <div>
      {teamMember && teamMember.blocks.map((block: TeamPageBlock) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  );
}
