import express from 'express';
import axios from 'axios'

const router = express.Router();


router.post('/user-data', async (req, res) => {
  const { accessToken } = req.body;
  try {
      const userProfile = await axios.get(`https://graph.facebook.com/me?fields=id,name,picture&access_token=${accessToken}`);
      const userPages = await axios.get(`https://graph.facebook.com/me/accounts?access_token=${accessToken}`);
      res.json({ profile: userProfile.data, pages: userPages.data });
  } catch (error) {
      res.status(500).send('Error fetching Facebook data');
  }
});


router.post('/page-insights', async (req, res) => {
  const { accessToken, userId, pageId } = req.body;

  try {
    const accountsResponse = await axios.get(`https://graph.facebook.com/${userId}/accounts?access_token=${accessToken}`);

    // Find the correct Page Access Token for the specified pageId
    let pageAccessToken = null;
    accountsResponse.data.data.forEach((account : any) => {
      if (account.id === pageId) {
        pageAccessToken = account.access_token;
      }
    });

    if (!pageAccessToken) {
      return res.status(404).json({ error: 'Page not found or access denied' });
    }

    // Fetch Page Insights using the Page Access Token
    const insightsResponse = await axios.get(`https://graph.facebook.com/${pageId}/insights`, {
      params: {
        metric: 'post_reactions_like_total,page_impressions_unique,page_post_engagements,page_follows',
        period: 'days_28',
        access_token: pageAccessToken
      }
    });

    // Return Page Insights data
    res.json(insightsResponse.data);
  } catch (error: any) {
    console.error('Error fetching Page Insights:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    res.status(500).send('Error fetching Page Insights');
  }
});
export default router;
