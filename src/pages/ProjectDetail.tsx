import 'react-medium-image-zoom/dist/styles.css';
import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import MarkdownView from '../components/MarkdownView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const ProjectDetail = () => {
    const { id } = useParams();
 const [ content, setContent ]= useState<string>(""); // Markdown ဖိုင်မှ ဖတ်လာမယ့် စာသားကို သိမ်းဆည်းရန် state

    useEffect(() => {
    // ID နဲ့ ကိုက်ညီတဲ့ markdown ဖိုင်ကို လှမ်းဖတ်ခြင်း
    fetch(`../projects/${id}.md`)
      .then(res => res.text())
      .then(text => setContent(text));
  }, [id]);

  return (
    <div className="h-auto bg-bg py-12 max-w-5xl mx-auto">
      <MarkdownView markdown={content} />
                <Link 
                    to="/project" 
                    className="flex items-center gap-2 text-text-muted hover:text-primary transition-all group"
                    >
                    <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:translate-x-1 transition-transform">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                    <span>Back to List</span>
                </Link>
    </div>
  );
};

export default ProjectDetail;