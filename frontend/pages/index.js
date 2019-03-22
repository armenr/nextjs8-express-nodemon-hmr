import Layout from '../components/MyLayout.js';
import getConfig from 'next/config';
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

console.log({
  Message: 'Diagnostic Info',
  PubRunTime: publicRuntimeConfig,
  SrvRunTime: serverRuntimeConfig
});

export default function Index() {
  return (
    <Layout>
      <p>Hello Next.js!</p>
    </Layout>
  );
}
