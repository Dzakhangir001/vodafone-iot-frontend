module.exports = {
  connect: {
    browserURL: process.env.PUPPETEER_BROWSER_URL,
    slowMo: parseInt(process.env.PUPPETEER_SLOW_MO, 10) || 0,
  },
};
