import {Resource} from 'sst';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                // Allow loading images from: vibepass-jviguy-vibepasseventimages-snwdomnu.s3.us-east-1.amazonaws.com
                // This is used for the event images
                protocol: 'https',
                hostname: Resource.VibePassEventImages.name + '.s3.us-east-1.amazonaws.com',
                port: '',
                pathname: '/**',
            }
        ]
    }
};

export default nextConfig;
