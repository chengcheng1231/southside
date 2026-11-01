import CommunityShell from '../../../../components/CommunityShell';
import StoryEditor from '../../../../components/StoryEditor';
export const metadata={title:'編輯草稿 — Southside'};
export default async function Page({params}){const {id}=await params;return <CommunityShell><StoryEditor key={id} draftId={id}/></CommunityShell>;}
