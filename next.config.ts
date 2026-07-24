import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  // /api/* 요청을 백엔드로 프록시한다.
  // 브라우저는 같은 오리진으로 인식하므로 CORS·쿠키 SameSite 문제가 없다.
  async rewrites() {
    const apiBase =
      process.env.NEXT_PUBLIC_API_URL ??
      process.env.NEXT_PUBLIC_APP_URL ??
      'http://localhost:3000';
    return [
      {
        source: '/api/:path*',
        destination: `${apiBase}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
