- Phần này sẽ thảo luận về vấn đề của PersistentData (dữ liệu liên tục)
- Một số concepts với container : immutable, ephemeral
- Hiểu và học cách sử dụng Data Volume nó giải quyết vấn đề  với persisten-data  ?
- Hiểu và học cách sử dụng Bind Mounts nó giải quyết vấn đề gì với persisten-data ?
- Assignment pratice
- Cho đến nay bạn chỉ quan tấm đến cách làm thế nào để chạy một container, chưa chú ý đến cách tương tác với dữ liệu container tạo ra trong quá trình chạy.
- Containers are usually immutable and ephemeral
=> Ý chính của câu này là chúng ta có thể tạo ra xóa một container một cách dễ dàng từ một image, trong phần này chúng ta không nói đến giới hạn của container mà chúng ta đang nói đến ý tưởng thiết kế mỗi container trong docker
=> Hãy tưởng tượng rằng bạn cần upgare một container, cấu hình lại....depoloy một container hoàn toàn mới, vậy dữ liệu trong quá trình chạy container (trong docker dữ liệu kiểu này gọi là unique data những thứ như record database, key/value) sẽ đi đâu ?
=> Docker cung cấp cho chúng ta một feature gọi là "separation of concerns" điều này, docker sẽ không trộn lẫn binaries app với unique data
=> Điều này mang lại lợi ích rất rất lớn, chúng ta có thể cập nhật và nâng cấp, re-deploy container thậm chí xóa mà không lo đến việc unique data bị ảnh hưởng

=> Docker có 2 solution cho vấn đề này Volumes và BindMounts
+ Dockervolume : hiểu đơn giản nó tạo một tệp tin bên ngoài container không nằm chung với unionfilesystem để lưu trữ unique data, điều này bảo tồn uniquedata , container cũng chỉ coi nó nó một đường dẫn cục bộ.
+ BindMounts : 
































Chúng ta có thể sử dụng tính năng  Docker Volume trong 
+ VOLUME : command in Dockerfile

- Bạn có thể sử  dụng lệnh docker volume prune để dọn sạch volume 
- Sử dụng lệnh docker container inspect ${containerName} để xem thông tin về container 
=> Chú ý 2 field là Mounts và Volume
+ Volume chính là nơi mà container sẽ lưu trữ unique data
+ Mount : đây là nơi chứa thông tin về nơi  lưu trữ unique data trong mount chú ý 2 field là Source và Destination, container chạy và lưu unique data vào Destination nhưng thực chất dữ liệu sẽ được lưu vào Source ở host (docker deamon) giống như chúng ta đang map 2 địa chỉ với nhau vậy container nghĩ rằng nó lưu data ở Destination nhưng thực chất nó lưu ở Source

=> Nếu chúng ta muốn config lại địa chỉ volume có thể sử dụng -v ví dụ sau đây với mysql (-e ${volumeName}:${path})
docker container run -d --name mysql_2 -e MYSQL_ALLOW_EMPTY_PASSWORD=True -v mysql-db:/var/lib/mysql mysql























Persistent Data : Bind Mount
+ Hiểu đơn giản nó là ánh xạ file hoặc thư mục trên máy chủ (máy nơi chúng ta cài đặt docker) đến file hoặc thụ mục chứa bên trong container, bạn hoàn toàn có thể chỉ định một tệp duy nhất hoặc một thư mục. Về cơ bản điều này giống như việc sẽ có 2 vị trị trỏ đến cùng một vị trí vật lý trên đĩa(disk)
+ Không thể sử dụng Bind Mount trong Dockerfile
+ Chỉ có thể sử dụng lúc run container
( command mẫu : -v /Users/bret/stuff:/path/container)