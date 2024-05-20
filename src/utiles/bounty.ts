import axios from 'axios';

export async function getCurrencyRate(usd: number) {
  const EXCHANGE_RATE_SECRET = process.env.EXCHANGE_RATE_SECRET || '';

  const res = await axios.get(
    `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_SECRET}/latest/USD`,
  );
  const INR_Rate = res.data.conversion_rates.INR;
  const INR_amount = +(usd * INR_Rate).toFixed(0);

  return INR_amount;
}

export async function sendBountyComment({
  repo_owner,
  repoName,
  PR_No,
  commentBody,
}: {
  repo_owner: string;
  repoName: string;
  PR_No: string;
  commentBody: string;
}) {
  const token = process.env.GITHUB_PAT || '';

  const url = `https://api.github.com/repos/${repo_owner}/${repoName}/issues/${PR_No}/comments`;
  await axios(url, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${token}`,
      'Content-Type': 'application/json',
    },
    data: { body: commentBody },
  });
}

export const formatUSD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatINR = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
});
