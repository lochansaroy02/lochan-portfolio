import httpx
import njsparser

url = "https://lochan-saroy.vercel.app"
headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

response = httpx.get(url, headers=headers)

# Pass the HTML text directly into the Next.js flight data parser
fd = njsparser.BeautifulFD(response.text)
print(fd)
# Iterate over data fragments extracted from the Flight Data array
# for data in fd.find_iter([njsparser.T.Data]):
#     if data.content is not None:
#         # Filter for your specific payload (e.g., product listings, user info)
#         print(data.content)
