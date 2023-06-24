# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from server.models.base_model_ import Model
from server.models.error import Error
from server import util

from server.models.error import Error  # noqa: E501


class File(Model):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.
    """

    def __init__(self, id=None, filename=None, is_checked=None, errors=None):  # noqa: E501
        """File - a model defined in OpenAPI

        :param id: The id of this File.  # noqa: E501
        :type id: int
        :param filename: The filename of this File.  # noqa: E501
        :type filename: str
        :param is_checked: The is_checked of this File.  # noqa: E501
        :type is_checked: bool
        :param errors: The errors of this File.  # noqa: E501
        :type errors: List[Error]
        """
        self.openapi_types = {
            'id': int,
            'filename': str,
            'is_checked': bool,
            'errors': List[Error]
        }

        self.attribute_map = {
            'id': 'id',
            'filename': 'filename',
            'is_checked': 'isChecked',
            'errors': 'errors'
        }

        self._id = id
        self._filename = filename
        self._is_checked = is_checked
        self._errors = errors

    @classmethod
    def from_dict(cls, dikt) -> 'File':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The File of this File.  # noqa: E501
        :rtype: File
        """
        return util.deserialize_model(dikt, cls)

    @property
    def id(self):
        """Gets the id of this File.

        ID файла.  # noqa: E501

        :return: The id of this File.
        :rtype: int
        """
        return self._id

    @id.setter
    def id(self, id):
        """Sets the id of this File.

        ID файла.  # noqa: E501

        :param id: The id of this File.
        :type id: int
        """

        self._id = id

    @property
    def filename(self):
        """Gets the filename of this File.

        Имя файла.  # noqa: E501

        :return: The filename of this File.
        :rtype: str
        """
        return self._filename

    @filename.setter
    def filename(self, filename):
        """Sets the filename of this File.

        Имя файла.  # noqa: E501

        :param filename: The filename of this File.
        :type filename: str
        """

        self._filename = filename

    @property
    def is_checked(self):
        """Gets the is_checked of this File.

        Статус проверки файла.  # noqa: E501

        :return: The is_checked of this File.
        :rtype: bool
        """
        return self._is_checked

    @is_checked.setter
    def is_checked(self, is_checked):
        """Sets the is_checked of this File.

        Статус проверки файла.  # noqa: E501

        :param is_checked: The is_checked of this File.
        :type is_checked: bool
        """

        self._is_checked = is_checked

    @property
    def errors(self):
        """Gets the errors of this File.

        :return: The errors of this File.
        :rtype: List[Error]
        """
        return self._errors

    @errors.setter
    def errors(self, errors):
        """Sets the errors of this File.

        :param errors: The errors of this File.
        :type errors: List[Error]
        """

        self._errors = errors