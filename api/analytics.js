import { BetaAnalyticsDataClient } from '@google-analytics/data';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GA4 Credentials
  const propertyId = process.env.GA_PROPERTY_ID || '538291064';
  const clientEmail = process.env.GA_CLIENT_EMAIL || 'daumis-analytics-reader@daumis-analytics.iam.gserviceaccount.com';
  let privateKey = process.env.GA_PRIVATE_KEY || `-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCybx73zHMVo3pB\ns1w4TgFt17NWEBvbKsPRJceanwI/U6EjPasNkWOoiNjbRiwGkxi5wKFRexXkTHOF\npRcJtFxA7ihAaB2LMMpq4LMqdx07ppOVbu7Fy6TSNCCaFLra9dUBjIbK80gS5e7f\njJkGY5OdtF1Z8aEQzcvWBf9+ZeIBVY2QPJ0+5DZOOXrQNai/qktwKNhZ/Bhmb2q7\nEyrhz7Ib/VG9FXgnU0bJd9iHdNFQMZr/MBe7UvLf+/Y6wMm9Ke7zYJpcEdta2jVx\n51OQbun4AM9K1Lg9FZOIi/6yaOjWmwd2Uo+VRDkAJAWZ/P3Pmkh9NPZAMGAZU1oL\n3RWvD/2BAgMBAAECggEAAlMtf4k6gvtqkM0WDvDAltkNj+SYAagiEt6lEL1w0Xjq\nO6k7yj/iS8mermVmFkmCiWG6aF32yCRRNAUAPW2MGdd7OZ2cVu+Hj6gbsC+1oeJB\ngDFeFesu8QM3XTKXHa/AJavvp1jPUARkHfsOamAlRf6EjIhissiaVuX58SsW1wbB\nVKx67m/GQbyi+UFZ31GCORz+w1xzUexZy+693XN8ap7EC5Vt6oI1X3m+MkDDLgtx\nkJYUzskNWZdrnqk5pVSBwqVcqZpq7j5Np/VudOxHBxyN2Otv1dCyKhKseB8h7LKD\nBsClejhQGKaYRFW/IaY20eXnIiZm20+h4c0aTJiD3QKBgQDsUPk+3U+LLC6BEkqU\nxr9XkrdIrIo8kC/11zc/HRFyd4U0Dw9Wsu51AHW1rH2t0RlEcOKmkGAjFraXXFSD\n/hyABfI2foar2qm6WhQtYIsEKp9lhoOGEV94gU+VSEUnKo1UGw54xintnmrDeSdq\nB0daDWPceDGFtOiAgN6tiHv8RQKBgQDBS+lGEp96Y04kOGMbkPl676QDiprAXlqF\nqylNxMmuNcPjtuzsSNx5I/yDcMZ996z0I6Gw9tN+EvCD5OPZQP4qpz4UoUkrp7Ey\nsF6HfT350mcL8FoQPkoPgWarlK4ZHQU23MApCWAzqKr3wAvgD8V8wX5/a79+kPCz\nSf4m4sFWDQKBgCzNeUOy36bKHJL57cvhFlu7BCayF4894ungAKhlkW47PLTO+iB8\n0fq6uJZV+oner8SrBj1/98oPP1TY+2j+31ZiSjaMrGmejjk3ZMXpnNGQZyHva7Ya\nSxhko7rwtbOkPKEqdAbvwvk65JDkwlU2xg9LpJgi7XilAMOEKzOJQcBlAoGATKiV\naBPkqX4OtHCkZX9WYbn+WuUyQE5rKg3agJwlu/BYssuOJJs0zNpHv70PC1AZiG1F\nJ9CLybkrJ7Oz5SpQYowXI8lfInAL52Vo5+T0mkomUebNYRnC92lDVZLOhOkscziT\nAPNV8sbWnxDL5N18XeDDETejJ0fGHeSfZb6SHFUCgYBnHg2YMXxKTeCMFFAADbxG\nh2bhWCXq7EwzSwrdmKCQGN1lKmbRYyePmHmspLOpGAMSz7TZYC81MMjtFyMI0Qkl\nqgCFzyxyFsjy5wvSlM664wOHv+FTmpEYXQjmoWqwaRI0cJ7tXgRkkkv5o+IScSl/\n9rNwOtRD+vU7jux7Sh3vsg==\n-----END PRIVATE KEY-----\n`;

  if (privateKey.includes('\\n')) {
    privateKey = privateKey.replace(/\\n/g, '\n');
  }

  try {
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
    });

    // Query report data and real-time data in parallel
    const [visitorTrendResponse, trafficSourceResponse, popularPagesResponse] = await Promise.all([
      // 1. Visitor Trend (last 7 days active users)
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'date' }],
        metrics: [{ name: 'activeUsers' }],
        orderBys: [{ dimension: { dimensionName: 'date' } }],
      }),
      // 2. Traffic Source (last 30 days channel group)
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'activeUsers' }],
      }),
      // 3. Popular Pages (last 30 days page views)
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'pageTitle' }],
        metrics: [{ name: 'screenPageViews' }],
        limit: 5,
      }),
    ]);

    // Parse Visitor Trend
    const visitorTrend = (visitorTrendResponse[0].rows || []).map(row => {
      const rawDate = row.dimensionValues[0].value; // YYYYMMDD
      const formattedDate = `${rawDate.slice(4, 6)}/${rawDate.slice(6, 8)}`; // MM/DD
      return {
        date: formattedDate,
        visitors: parseInt(row.metricValues[0].value, 10),
      };
    });

    // Parse Traffic Source
    const trafficSources = (trafficSourceResponse[0].rows || []).map(row => ({
      source: row.dimensionValues[0].value,
      visitors: parseInt(row.metricValues[0].value, 10),
    }));

    // Parse Popular Pages
    const popularPages = (popularPagesResponse[0].rows || []).map(row => ({
      title: row.dimensionValues[0].value.split(' | ')[0] || row.dimensionValues[0].value,
      views: parseInt(row.metricValues[0].value, 10),
    }));

    // Parse Real-time active users (fallback to 1 if none online)
    let realTimeVisitors = 1;
    try {
      const realTimeResponse = await analyticsDataClient.runRealtimeReport({
        property: `properties/${propertyId}`,
        metrics: [{ name: 'activeUsers' }],
      });
      if (realTimeResponse[0] && realTimeResponse[0].rows && realTimeResponse[0].rows[0]) {
        realTimeVisitors = parseInt(realTimeResponse[0].rows[0].metricValues[0].value, 10) || 1;
      }
    } catch (e) {
      console.error('Real-time query issue:', e);
    }

    res.status(200).json({
      success: true,
      realTimeVisitors,
      visitorTrend,
      trafficSources,
      popularPages,
    });
  } catch (error) {
    console.error('GA4 API Error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
