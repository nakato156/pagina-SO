from os import getenv
from pathlib import Path
from imagekitio import ImageKit
from imagekitio.models.UploadFileRequestOptions import UploadFileRequestOptions

FOLDER_IMG = getenv("FOLDER_IMG")
ENDPOINT = getenv("ENDPOINT_IMG")

imagekit = ImageKit (
    private_key=getenv("PRIV_KEY_IMG"),
    public_key=getenv("PUB_KEY_IMG"),
    url_endpoint=ENDPOINT
)

def upload_image(file:Path, filename:str):
    transformation = {
        'pre': 'w-300,h-300,f-jpg', 
    }
    options = UploadFileRequestOptions(
        use_unique_file_name=True,
        folder= FOLDER_IMG,
        is_private_file=False,
        transformation=transformation
    )
    return imagekit.upload_file(file=open(file, 'rb'), file_name=filename, options=options)

def delete_image(uuid:str):
    return imagekit.delete_file(file_id=uuid)