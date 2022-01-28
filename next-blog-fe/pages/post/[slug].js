import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect } from 'react';
import styles from '../../styles/Post.module.css';
import BlockContent from '@sanity/block-content-to-react';
import { Toolbar } from '../../components/toolbar';

export const Post = ({ title, body, image }) => {
      const [imageUrl, setImageUrl] = useState('');

      useEffect(() => {
            const imgBuilder = imageUrlBuilder({
                  projectId: '8r1mzusv',
                  dataset: 'production',
            });

            setImageUrl(imgBuilder.image(image));
      }, [image]);
      const client = require('@sanity/client')({
            projectId: '8r1mzusv',
            dataset: 'production',
            apiVersion: '2021-03-25',
            useCdn: true
      })

      return (

            <main className="bg-gray-200 min-h-screen p-12">
                  <Toolbar />
                  <article className="container shadow-lg mx-auto bg-green-100 rounded-lg">
                        <header className="relative">
                              <div className="absolute h-full w-full flex items-center justify-center p-8">
                                    <div className="bg-white bg-opacity-75 rounded p-12">
                                          <h1 className="cursive text-3xl lg:text-6xl mb-4">
                                                {title}
                                          </h1>
                                          <p>{ }</p>
                                          <div className="flex justify-center text-gray-800">
                                                {/* {imageUrl && <img className={styles.mainImage} src={imageUrl} />} */}
                                                {/* <p className="cursive flex items-center pl-2 text-2xl">
                  {singlePost.name}
                </p> */}
                                          </div>
                                    </div>
                              </div>
                              <img
                                    src={imageUrl}

                                    className="w-full object-cover rounded-t"
                                    style={{ height: "400px" }}
                              />
                        </header>
                        <div className="px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full">
                              <BlockContent blocks={body} projectId='8r1mzusv' dataset='production' />
                        </div>
                  </article>
            </main>













            // <div>
            //       <Toolbar />
            //       <div className={styles.main}>
            //             <h1>{title}</h1>
            //             {imageUrl && <img className={styles.mainImage} src={imageUrl} />}

            //             <div className={styles.body}>
            //                   <BlockContent blocks={body} projectId='8r1mzusv' dataset='production' />
            //             </div>
            //       </div>
            // </div>
      );
};

export const getServerSideProps = async pageContext => {
      const pageSlug = pageContext.query.slug;

      if (!pageSlug) {
            return {
                  notFound: true
            }
      }

      const query = encodeURIComponent(`*[ _type == "post" && slug.current == "${pageSlug}" ]`);
      const url = `https://8r1mzusv.api.sanity.io/v1/data/query/production?query=${query}`;

      const result = await fetch(url).then(res => res.json());
      const post = result.result[0];

      if (!post) {
            return {
                  notFound: true
            }
      } else {
            return {
                  props: {
                        body: post.body,
                        title: post.title,
                        image: post.mainImage,
                  }
            }
      }
};

export default Post;