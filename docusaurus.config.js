module.exports = {
  title: 'Vortex Framework',
  tagline: 'Vortex Framework project page',
  url: 'https://vortex.d0.si',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'd0si',
  projectName: 'vortex-docs',
  themeConfig: {
    navbar: {
      title: 'Vortex Framework',
      logo: {
        alt: 'Vortex Logo',
        src: 'img/vortex-logo-white.svg',
      },
      links: [
        {
          to: 'docs/getting-started/introduction',
          activeBasePath: 'docs',
          label: 'Documenatation',
          position: 'left',
        },
        {
          href: 'https://github.com/d0si/vortex',
          label: 'GitHub/d0si/vortex',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
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
