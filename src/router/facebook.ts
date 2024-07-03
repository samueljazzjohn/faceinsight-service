import express from 'express';
import axios from 'axios'
import { facebookErrorMiddleware } from '../middleware/facebookAuth';

const router = express.Router();


router.post('/user-data', facebookErrorMiddleware, async (req :any, res: any) => {
  const { accessToken } = req.body;
  try {
      const userProfile = await axios.get(`https://graph.facebook.com/me?fields=id,name,picture&access_token=${accessToken}`);
      const userPages = await axios.get(`https://graph.facebook.com/me/accounts?access_token=${accessToken}`);
      res.json({ profile: userProfile.data, pages: userPages.data });
  } catch (error) {
      res.status(500).send('Error fetching Facebook data');
  }
});


router.post('/page-insights',facebookErrorMiddleware, async (req:any, res:any) => {
  const { accessToken, userId, pageId,since, until } = req.body;

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

    const sinceDate = new Date(since);
        const untilDate = new Date(until);
        const timeDifference = (untilDate.getTime() - sinceDate.getTime()) / 1000;

        // Check if the time range exceeds 93 days (8035200 seconds)
        if (timeDifference > 8035200) {
            return res.status(400).json({
                error: {
                    message: 'The time range cannot exceed 93 days',
                }
            });
        }

    const insightsResponse = await axios.get(`https://graph.facebook.com/v20.0/${pageId}/insights?metric=post_reactions_like_total,page_impressions_unique,page_post_engagements,page_follows&period=total_over_range&until=${until}&since=${since}&access_token=${pageAccessToken}`)

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
