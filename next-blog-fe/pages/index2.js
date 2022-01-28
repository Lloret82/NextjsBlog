import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Toolbar } from '../components/toolbar';
import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BlockContent from '@sanity/block-content-to-react';

export default function Home({ posts }) {
      const router = useRouter();
      const [mappedPosts, setMappedPosts] = useState([]);

      useEffect(() => {
            if (posts.length) {
                  const imgBuilder = imageUrlBuilder({
                        projectId: '8r1mzusv',
                        dataset: 'production',
                  });

                  setMappedPosts(
                        posts.map(p => {
                              return {
                                    ...p,
                                    mainImage: imgBuilder.image(p.mainImage).width(250).height(250),
                              }
                        })
                  );
            } else {
                  setMappedPosts([]);
            }
      }, [posts]);

      return (
            <main className={styles.body}>
                  <Toolbar />

                  <div className={styles.main}>
                        <h1>Welcome To My Blog</h1>

                        <h3>Recent Posts:</h3>

                        <div className={styles.container}>

                              {mappedPosts.length ? mappedPosts.map((p, index,) => (
                                    <div onClick={() => router.push(`/post/${p.slug.current}`)} key={index} >
                                          <div className={styles.container}>
                                                <div className={styles.card}>
                                                      <div className={styles.card__header}>
                                                            <img src={p.mainImage} alt="card__image" className={styles.card__image} width="600" />
                                                      </div>
                                                      <div className={styles.card__body}>
                                                            <h4>{p.title}</h4>
                                                            <p>{p.text}</p>
                                                      </div>

                                                </div>
                                          </div>
                                    </div>





                              )) : <>No Posts Yet</>}
                        </div>
                  </div>



            </main>
      );
}

export const getServerSideProps = async pageContext => {
      const query = encodeURIComponent('*[ _type == "post" ]');
      const url = `https://8r1mzusv.api.sanity.io/v1/data/query/production?query=${query}`;
      const result = await fetch(url).then(res => res.json());

      if (!result.result || !result.result.length) {
            return {
                  props: {
                        posts: [],
                  }
            }
      } else {
            return {
                  props: {
                        posts: result.result,
                  }
            }
      }
};