// Browser-only repository. Future persistence can replace this adapter without changing the editor.
const KEY='southside.story-drafts.v1';
export function readDrafts(){
 const raw=localStorage.getItem(KEY);if(!raw)return [];
 const parsed=JSON.parse(raw);if(!Array.isArray(parsed))throw new Error('草稿資料格式不正確，請先備份瀏覽器資料。');
 return parsed.filter(d=>d&&typeof d.id==='string'&&typeof d.title==='string'&&typeof d.body==='string');
}
export function saveDraft(draft){
 const drafts=readDrafts();const saved={...draft,id:draft.id||crypto.randomUUID(),updatedAt:new Date().toISOString(),status:'draft'};
 localStorage.setItem(KEY,JSON.stringify([saved,...drafts.filter(d=>d.id!==saved.id)]));return saved;
}
export function deleteDraft(id){localStorage.setItem(KEY,JSON.stringify(readDrafts().filter(d=>d.id!==id)));}
