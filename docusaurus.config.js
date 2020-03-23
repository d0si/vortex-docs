module.exports = {
  title: 'Vortex Docs',
  tagline: 'Documentation for Vortex project',
  url: 'https://docs.vortex.d0.si',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'd0si',
  projectName: 'vortex-docs',
  themeConfig: {
    navbar: {
      title: 'Vortex Docs',
      logo: {
        alt: 'Vortex Logo',
        src: 'img/vortex-logo-white.svg',
      },
      links: [
        {
          to: 'docs/getting-started/introduction',
          activeBasePath: 'docs',
          label: 'Documenataion',
          position: 'left',
        },
        /*{to: 'blog', label: 'Blog', position: 'left'},*/
        {
          href: 'https://github.com/d0si/vortex',
          label: 'GitHub/d0si/vortex',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        /*{
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/doc1',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2',
            },
          ],
        },*/
        /*{
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
          ],
        },*/
        /*{
          title: 'Social',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },*/
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Delta Zero. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/d0si/vortex-docs/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
