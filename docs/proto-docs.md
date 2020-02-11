# Protocol Documentation
<a name="top"></a>

## Table of Contents

- [comments.proto](#comments.proto)
    - [Comment](#comments.Comment)
    - [CommentsList](#comments.CommentsList)
    - [CreateCommentInput](#comments.CreateCommentInput)
  
  
  
    - [CommentsService](#comments.CommentsService)
  

- [commons.proto](#commons.proto)
    - [Count](#commons.Count)
    - [Id](#commons.Id)
    - [Name](#commons.Name)
    - [Query](#commons.Query)
  
  
  
  

- [organizations.proto](#organizations.proto)
    - [Organization](#organizations.Organization)
    - [OrganizationsList](#organizations.OrganizationsList)
  
  
  
    - [OrganizationsService](#organizations.OrganizationsService)
  

- [users.proto](#users.proto)
    - [User](#users.User)
    - [UsersList](#users.UsersList)
  
  
  
    - [UsersService](#users.UsersService)
  

- [Scalar Value Types](#scalar-value-types)



<a name="comments.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## comments.proto



<a name="comments.Comment"></a>

### Comment



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  |  |
| organization | [string](#string) |  |  |
| comment | [string](#string) |  |  |
| createdAt | [string](#string) |  |  |
| updatedAt | [string](#string) |  |  |
| version | [int32](#int32) |  |  |






<a name="comments.CommentsList"></a>

### CommentsList



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [Comment](#comments.Comment) | repeated |  |






<a name="comments.CreateCommentInput"></a>

### CreateCommentInput



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| organization | [string](#string) |  |  |
| comment | [string](#string) |  |  |





 

 

 


<a name="comments.CommentsService"></a>

### CommentsService


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| findAll | [.commons.Query](#commons.Query) | [CommentsList](#comments.CommentsList) |  |
| count | [.commons.Query](#commons.Query) | [.commons.Count](#commons.Count) |  |
| create | [CreateCommentInput](#comments.CreateCommentInput) | [Comment](#comments.Comment) |  |
| destroy | [.commons.Query](#commons.Query) | [.commons.Count](#commons.Count) |  |

 



<a name="commons.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## commons.proto



<a name="commons.Count"></a>

### Count



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| count | [int32](#int32) |  |  |






<a name="commons.Id"></a>

### Id



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  |  |






<a name="commons.Name"></a>

### Name



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  |  |






<a name="commons.Query"></a>

### Query



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| attributes | [string](#string) | repeated |  |
| where | [string](#string) |  |  |
| order | [string](#string) |  |  |
| offset | [int32](#int32) |  |  |
| limit | [int32](#int32) |  |  |





 

 

 

 



<a name="organizations.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## organizations.proto



<a name="organizations.Organization"></a>

### Organization



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  |  |
| name | [string](#string) |  |  |
| createdAt | [string](#string) |  |  |
| updatedAt | [string](#string) |  |  |
| version | [int32](#int32) |  |  |






<a name="organizations.OrganizationsList"></a>

### OrganizationsList



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [Organization](#organizations.Organization) | repeated |  |





 

 

 


<a name="organizations.OrganizationsService"></a>

### OrganizationsService


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| findAll | [.commons.Query](#commons.Query) | [OrganizationsList](#organizations.OrganizationsList) |  |
| findByName | [.commons.Name](#commons.Name) | [Organization](#organizations.Organization) |  |
| count | [.commons.Query](#commons.Query) | [.commons.Count](#commons.Count) |  |

 



<a name="users.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## users.proto



<a name="users.User"></a>

### User



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  |  |
| organization | [string](#string) |  |  |
| loginId | [string](#string) |  |  |
| avatar | [string](#string) |  |  |
| followers | [int32](#int32) |  |  |
| following | [int32](#int32) |  |  |
| createdAt | [string](#string) |  |  |
| updatedAt | [string](#string) |  |  |
| version | [int32](#int32) |  |  |






<a name="users.UsersList"></a>

### UsersList



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [User](#users.User) | repeated |  |





 

 

 


<a name="users.UsersService"></a>

### UsersService


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| findAll | [.commons.Query](#commons.Query) | [UsersList](#users.UsersList) |  |
| count | [.commons.Query](#commons.Query) | [.commons.Count](#commons.Count) |  |

 



## Scalar Value Types

| .proto Type | Notes | C++ Type | Java Type | Python Type |
| ----------- | ----- | -------- | --------- | ----------- |
| <a name="double" /> double |  | double | double | float |
| <a name="float" /> float |  | float | float | float |
| <a name="int32" /> int32 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint32 instead. | int32 | int | int |
| <a name="int64" /> int64 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint64 instead. | int64 | long | int/long |
| <a name="uint32" /> uint32 | Uses variable-length encoding. | uint32 | int | int/long |
| <a name="uint64" /> uint64 | Uses variable-length encoding. | uint64 | long | int/long |
| <a name="sint32" /> sint32 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int32s. | int32 | int | int |
| <a name="sint64" /> sint64 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int64s. | int64 | long | int/long |
| <a name="fixed32" /> fixed32 | Always four bytes. More efficient than uint32 if values are often greater than 2^28. | uint32 | int | int |
| <a name="fixed64" /> fixed64 | Always eight bytes. More efficient than uint64 if values are often greater than 2^56. | uint64 | long | int/long |
| <a name="sfixed32" /> sfixed32 | Always four bytes. | int32 | int | int |
| <a name="sfixed64" /> sfixed64 | Always eight bytes. | int64 | long | int/long |
| <a name="bool" /> bool |  | bool | boolean | boolean |
| <a name="string" /> string | A string must always contain UTF-8 encoded or 7-bit ASCII text. | string | String | str/unicode |
| <a name="bytes" /> bytes | May contain any arbitrary sequence of bytes. | string | ByteString | str |

