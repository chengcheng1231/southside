import {redirect} from 'next/navigation';
import {showExperiences} from '../../lib/site-features';
export default function Page(){redirect(showExperiences?'/#notes':'/');}
