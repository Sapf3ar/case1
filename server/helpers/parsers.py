from server.models import File, Error


def db_error_to_error(db_error) -> Error:
    error = Error(
        id=db_error.id,
        description=db_error.description,
        subject=db_error.subject,
        match=db_error.match,
        page=db_error.match,
        line=db_error.line
    )
    return error


def db_errors_to_errors(db_errors) -> list:
    result = []
    for db_error in db_errors:
        result.append(db_error_to_error(db_error))
    return result


def db_file_to_file(db_file) -> File:
    file = File(
        id=db_file.id,
        filename="_".join(db_file.filename.split("_")[:-2]),
        is_checked=db_file.is_checked,
        errors=db_errors_to_errors(db_file.errors)
    )

    return file


def db_files_to_files(db_files) -> list:
    result = []

    for db_file in db_files:
        result.append(db_file_to_file(db_file))

    return result
