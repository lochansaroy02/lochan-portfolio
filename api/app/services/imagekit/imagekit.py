# from pathlib import Path

# from imagekitio import ImageKit, imagekit

# # Upload from file
# response = imagekit.files.upload(
#     file=Path("product.jpg"),
#     file_name="product.jpg",
#     folder="/products",
#     tags=["product", "featured"],
# )
# print(f"File ID: {response.file_id}")
# print(f"URL: {response.url}")

# # Upload from bytes (web forms)
# image_data = request.files["image"].read()
# response = imagekit.files.upload(file=image_data, file_name="upload.jpg")

# # Stream large files
# with open("video.mp4", "rb") as f:
#     response = imagekit.files.upload(file=f, file_name="video.mp4")
