import contributors from '../content/contributors.json';
export {contributors};
export function contributorHref(author={}){
 const contributor=contributors.find(person=>author.email?person.email===author.email:person.name===author.name);
 return contributor?`/contributors#${contributor.id}`:'/contributors';
}
