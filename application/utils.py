from flask import Response


def create_file_response(data, filename, file_type):
    """ Creates a response containing a file.

        Args:
            data (generator): A generator containing the content of file
            file_type (str): Type of file to create (eg. 'json', 'csv')
    
        Returns:
            A Response object containing the created file 

    """
    file_mime_types = {
    'json': 'application/json',
    'html': 'text/html',
    'csv': 'text/csv',
    }

    mime_type = file_mime_types.get(file_type)

    response = Response(data(), mimetype=mime_type)
    response.headers.set("Content-Disposition", "attachment", filename=f"{filename}.{file_type}")

    return response