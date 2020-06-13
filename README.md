# Udemy Course Docker Mastery: with Kubernetes+Swarm from a Docker Captain

> Build, test, deploy containers with the best mega-course on Docker, Kubernetes, Compose, Swarm and Registry using DevOps

This repo is for use in my Udemy Courses "Docker Mastery" and "Swarm Mastery"

Get these courses for with my "cheapest on the Internet" coupon links:

https://www.bretfisher.com/courses

My other DevOps and Docker resources are at https://www.bretfisher.com/docker

Feel free to create issues or PRs if you find a problem with examples in this repo!




Image vs Container

 * Một Image là ứng dụng chúng ta muốn chạy
 * Một Container là một instance  Image chạy trên một process
 * Từ đó suy ra có thể có nhiều contaiers chạy cùng một Image 

 * Hiện tại docker đã support chính thức cho cấu trúc câu lệnh mới nhưng cấu trúc câu lệnh cũ vẫn họat động.
 => Ví dụ : docker run (old way) => docker container run(new way) cả 2 cách này đều hoạt động

* Một số câu lệnh phổ biến :
- docker container run --publish 80:80 nginx (khởi động một container mới từ một Image)
+ Docker engine tìm kiếm một Image có tên là nginx
+ Docker pull nginx mới nhất từ DockerHub 
+ Nó start nginx như một process mới trong một container mới để chúng ta sử dụng.
+ Mở cổng 80 trên máy tính và ghi lại tất cả lưu lượng truy cập đi qua cổng này đến máy chủ nginx và lưu lại trong container.

(Note : Vì nginx là một máy chủ web nên nó sẽ mặc định mở cổng 80)

- docker container run --publish 80:80 --detach nginx
+ Cho container chạy dưới nền (không hiển thị lưu trượng truy cập lên terminal mọi lúc nữa)

- docker container ls 
+ Xem nhũng container nào đang chạy

- docker container stop ${containerId}
+ Dừng container

- docker contatner ls -a
+ Hiển thị tất cả các container trong Image

- docker container run
+ Mỗi lần chạy run thì nó sẽ tạo một container mới từ Image Nginx.

- docker container start
+ Mỗi lần chạy start thì nó sẽ khởi động lại những container đã stop

-docker container run --publish 80:80 --detach --name webhost nginx
+ Tạo một container mới dựa trên Image nginx và đặt tên nó là webhost
+ Cho nó chạy dưới nền (không logs ra terminal)

- docker container logs ${containerID}
+ Xem logs của những container chạy dưới nền.

- docker container rm ${listContainer} 
+ Xóa các container trong list (chỉ xóa những container đã stop)

- docker container rm -f {listContainer}
+ Xóa các container trong list kể cả nó vẫn đang chạy

- docker container top ${containerId||containerName}
+ Sử dụng docker container top để thấy được các process riêng biệt chạy bên trong một container, vs PID chính là ID của process đó.

- docker ps vs docker container ls 
+ Câu lệnh có chức năng giống nhau đều hiển thị list các container đang hoạt động

- docker container ls -a 
+ Hiển thị tất cả các container 

+ docker container top ${containerName} : 
- danh sách quy trình trong container

+ docker container inspect ${containerName}
- chi tiết về cấu hình của container (startup,config,volume...)

+ docker container stats 
- thống kế hiệu suất cho tất cả các container

- docker container run -p
+ Hiển thị port cho container


* Điều gì xảy ra chạy "docker container run" ?
+ B1 Docker sẽ tìm kiếm Image trong cache ở local mà chúng ta đã chỉ định ở cuối câu lệnh  
+ B2 Nếu không tìm thấy Image nó sẽ lên DockerHub (default) để tìm. 
+ B3 Chúng ta có thể chỉ định phiên bản cho Image theo mặc định nó sẽ dowload version mới nhất.
+ B4 Docker sẽ tạo ra một container mới dựa trên Image, tưởng tượng nó như một layout phía trên cùng của Image.
+ B5 Docker sẽ custom networking, cung cấp một địa chỉ IP ảo cụ thể nằm trong Docker Engine.
+ B6 Docker sẽ mở cổng nếu chúng ta chỉ định nếu chúng ta không chỉ định nó sẽ không mở cổng nào (Giả sử nếu chúng ta chỉ định cổng 80 thì có nghĩa chúng ta nói với Docker rằng hãy lấy cổng 80 trên server và chuyển tiếp tất cả lưu lượng truy cập vào trong cổng 80 của container )

VD: docker container run--publish 8080:80 -name webhost -d nginx:1.11 nginx -T


docker container run -d -p 8888:90 --name mysqldb -e MYSQL_RANDOM_ROOT_PASSWORD=yes mysql
docker container run -d --name proxy -p 80:80 nginx
docker container run -d --name webserver -p 8080:80 httpd









* So sánh Container và VM
- Container chỉ là tập hợp của nhiều processes chạy trên HĐH của máy tính.
- Container cũng bị giới hạn những tài nguyên mà nó có thể truy cập
- Container dừng khi process dừng.
* Getting a shell inside container
- docker container run -it 
+ tạo ra một container rồi tương tác trực tiếp với nó.

- docker container start -ai ${containerName}
+ Khởi động lại một container đã stop rồi giao tiếp với nó thông qua terminal

- docker container exec -it ${containerName}
+ Tạo ra một quy trình mới bên trong một container đã chạy dùng để tương tác trực tiếp vs một container đã tồn tại và đang chạy thông qua terminal

=> Đi kèm với it có rất nhiều option
- bash shell : nếu chạy cùng với it, nó sẽ cung cấp cho bạn terminal để chạy bên trong container , khi đã ở trong container chúng ta sử  lệnh "ls -al" để xem tất cả tài nguyên trong container
- Nếu muốn chạy bash đó thì sử dụng lệnh
docker container start -ai ${containerName}

- Nếu muốn thấy những gì đang chạy trong container = shell hay nói cách khác là kiểm tra các quy trình bổ sung (run additional process in running container) trong container
=> docker container exec -it {containerName} bash
=> Bằng cách này bạn tạo ra một process mới trong container nên khi close bash thì container vẫn chạy bình thường.














Docker Networks : Concepts
- docker container run -p
+ Hiển thị port của container
- docker container port ${containerName}
+ Hiển thị port của container nào đó.
- Hiển cách thức các gói mạng di chuyển xung quanh Docker
- Làm sao để các container có thể nói chuyện được với nhau.

- Khi bạn start một container thì ở dưới nền (background) bạn thực sự đang kết nối đến một Docker Network cụ thể
- Môi container đều kết nối đến một private network virtual còn được gọi là  (virtual network bridge)
- Mỗi tuyến mạng ảo (virtual network routes) thông qua tường lửa NAT (firewall NAT) trên IP máy chủ (host IP)
- Thực ra là docker deamon đã cấu hình địa chỉ IP (IP address) của máy chủ trên giao diện mặc định của nó để container có thể kết nối được internet
- Tất cả container trên mạng ảo (virtual network) có thể giao tiếp với nhau mà không cần -p khác với server của chúng ta .

- docker container port ${containerName}
+ 
Phân tích câu lệnh: docker container run -p 80:80 --name webhost -d nginx
chúng ta sử dụng -p để setup port
+ Giá trị bên trái là yêu cầu Host OS System ở một cổng với giá trị tương ứng 
+ Giá trị bên phải chính là cổng sẽ được container mở ra để lưu lượng mạng đi qua cổng bên trái (trên OS System) sẽ đi vào cổng này.
=> Khi thông 2 cổng ở Host Operation System và Container thì container có thể nhận traffig thì internet và ngược lại.
=> Nếu như bạn không setup port (-p) thì sẽ không có bất kì traffic nào đến virtual network  hay nói dễ hiểu hơn là (local network)

- Best practice là tao một mạng riêng ảo cho từng app
+ mạng "my_web_app" cho mysql và php/apache container, ở netwokr my_web_app thì mysql container và php/apache container có thể giao tiếp với nhau vì chúng đang nằm trên cùng một virtual network
+ mạng "my_api" cho mongo và node.js container, tương tự như my_web_api các container trong mạng này có thể nói chuyện với nhau => nhưng rõ ràng chúng không thể giao tiếp với những container ở network khác được.

- docker container port ${containerName}

- Batteries Included , But removable
- Mặc định hoạt động tốt trong nhiều trường hợp nhưng dễ dàng tráo đổi của những phần của chúng ta để tùy chỉnh.
- Đính kèm (attach) container vào nhiều hơn 1 mạng ảo (virtual network) hoặc không vào mạng nào.
- Bạn có thể bỏ qua mạng ảo (virtual network) và sử dụng host IP ((IP của máy chủ)(--net=host)
- Sử  dụng docker network driver để mở rộng cho nhiều ứng dụng bên thứ 3
- Hãy nhớ các port luôn public ở dạng HOST:CONTAINER.

-Một tùy chọn phổ biến để định dạng đầu ra của các lệnh bằng cách sử dụng "Go templates"

- Nếu bạn muốn lấy IP address của container
+ docker container inspect --format "{{ .NetworkSettings.IPAddress}}" ${containerName}

- Khái niệm cơ bản về  docker network
+ Giả sử chúng ta có một HĐH trong trường hợp này là Ubuntu và Physical Network , Ubuntu sẽ kết nối với Physical Network để có thể kết nối tới mạng internet.
+ Ở trên HĐH có một thứ gọi là NAT , hiểu đơn giản nó như một tường lửa kiểm soát lưu lượng truy cập Internet ra vào HĐH
+ Lúc này docker network xuất hiện nó tạo ra một thứ gọi là "Bridge Network/ Hay còn gọi là Docker 0"
+ Khi bạn chạy một container, mặc định nó sẽ được join vào Bridge Network, Bridge Network sẽ được tự động gán vào Interface Ethernet từ đó container có thể thông qua Bridge Network để truy cập internet
+ Như vậy giả sử chúng ta chạy docker contaner run -p 8080:80 có nghĩa là chúng ta đang yêu cầu mở một cổng 8080 trên Interface Ethernet và mọi lưu lượng truy cập đi qua cổng 8080 sẽ được chuyển tiếp đến cổng 80 trên container.
+ Khi mình tạo ra một container nữa mặc định nó cũng sẽ được join vào Bridge Network, 2 hay nhiều container cùng Bridge Network có thể giao tiếp dễ dàng với nhau nhưng bạn không chỉ định -p thì sẽ không có lưu lượng đi qua container đó.

+ Chúng ta cũng có thể tạo ra nhiều docker virtual network

- Trong docker network mỗi container đều có một IP ảo => mỗi container có thể sử dụng port 80 (giả sử) của riêng nó ví dụ (contaier1 1275.34534.345:80 container2 12234.23423.534:80) nhưng khi public lên máy chủ bạn sẽ gặp lỗi nếu một container (hoặc app server) đang sử dụng chung cổng.

- Nếu bạn muốn 2 hay nhiều container khác virtual network giao tiếp với nhau bạn phải đi qua cổng được mở trên HOST OS




























Docker Networks : CLI Management
+ Show networks docker network ls (hiển thi list các network)
+ Kiểm tra thông tin một network : docker network inspect
+ Tạo mới một network : docker network create --driver
Sử dụng diver của bên thứ 3 để tạo một network mới
+ Attach a network to container : docker network connect (sử dụng NIC để kết nối container network tới internet)
+ Detach a network form container : docker network disconnect
- Ngắt kết nối một network để có thể join vào một network khác
+  -- network bridge : docker network inspect bridge
Hiển thị thông tin về network của docker host
Sau khi chạy lệnh trên hãy nhìn vào dòng IPAM
=> đây là địa chỉ IP mặc định của docker host
=> nó có thể thay đổi 
=> Sử dụng để giao tiếp giữa các container với nhau
+ -- network host là một network đặc biệt, bỏ qua virtual network của docker mà nó sẽ attach trực tiếp container vào mạng của host (máy chủ)
+ -- network none không attach vào bất cứ mạng nào.
- Mặc định khi bạn tạo một network mới thì nó sẽ có kiểu bridge (tức là nó bắc cầu vượt qua tường lửa NAT để đến pysical network nới mà host connect tới internet)


=> Chúng ta có thể xem thông tin chi tiết của  network nào dựa vào lệnh
docker network inspect ${networkName}

- Chúng ta có thể connect container vào một network bằng câu lệnh
docker network connect ${networkId} ${containerId} 
nó sẽ tự động tạo một NIC trong container trên một mạng ảo hiện có.

- Tương tự chúng ta có thể disconnect container với một network bằng câu lệnh
docker network disconnect ${networkId} ${containerId}
nó sẽ tự động loại bỏ một NIC của một container trên một virtual network


- Sử dụng lệnh : docker network inspect ${networkId}
+ Để xem chi tiết của từng network, có những container nào đang được attach vào network đó.
+ Sử dụng lệnh : docker network creat ${networkName}
+ Tạo ra một network mới sử dụng mặc định drive bridge , sử dụng docker network create --help để biết nhiều thông tin hơn.

+ Sử dụng option --network lúc run một container để attach container đó vào network bạn muốn.
- docker container run -d -p 80:80 --network ${networkName} --name ${containerName} ${nginx}






































Docker Network : DNS

- Hiểu DNS cách nó ảnh hưởng đến các container trong các custom network.
- Hiểu tại sao coi DNS như một chìa khóa để có thể giao tiếp với  container - Xem cách hoạt động theo mặc định của các mạng tùy chỉnh.
- Hiểu sự khác nhau khi sử dụng DNS giữa default networl và custom network, 
- Học cách sử dụng --link để bật DNS trên default bridge network
- Điều quan trọng cần nhớ với tất cả container và virtual network khi họ giao tiếp với nhau đó là "naming" bởi vì thế giới của container thay đổi liên tục (xóa,mở rộng...) nên khi chúng giao tiếp thì sẽ không dùng IP, sử dụng IP là anti-pattern chúng ta không thể giả sử các địa chỉ IP là giống nhau container có thể mở rộng đóng hoặc thất bại.
=> giải pháp thích hợp cho chuyện này là sử dụng DNS

- Docker sử dụng container name tương đương vs host name để các container có thế nói chuyện với nhau.
- Mỗi container khi join vào một network nó đều public port của nó trong network đó, nhưng không public port cho giao diện bên ngoài trừ khi bạn dùng option -p.
- Khi chúng ta tạo ra một network mới (không phải theo mặc định bridge) thì những container trên nó sẽ được tích hợp một tính năng đặc biệt là Hệ thống phân giải tên miền (DNS) 
- Mọi container trên virtual network (not default) sử dụng container name.
- Nếu tôi tạo thùng chứa thứ 2 trên mạng ảo này thì 2 container có thể tìm thấy nhau bất kể IP là gì.

-Docker để mặc định tên của máy chủ chính là tên của container nhưng có thể đặt alias cho nó.


=> Sự khác biệt lớn nhất giữa việc sử dụng customNetwork và defaultNetwork đó là khi sử dụng defaultNetwork chúng ta không được thích hợp theo mặc định, thay vào đó bạn có thể sử dụng --link để các container trong defaultNetwork có thể giao tiếp được với nhau. docker container create --link































Assignment : DNS Round Robin Test

+ Kể từ phiên bản Docker Engin 1.11 , chúng ta có thể có nhiều container trên một network mà sẽ phản hồi cùng với một DNS addres
+  Sử dụng lệnh -network-alias ${value} để cung cấp cho container một DNS name bổ sung.




































Docker Image
- Tất cả về images , các khối xây dựng của containers.
- Những gì có trong image và cái gì không có.
- Sử dụng Docker Hub registry
- Managing our local image cache
- Tạo Image của riêng chúng ta.


=> Một Image là gì ? và những gì không ?
+ Application binaries và dependencies.
+ Metadata về image và cách chạy image.
+ Không có OS, không có kernel , hay kernel module (không có driver) 
+ Image thực sự chỉ là các tệp binaries mà ứng dụng của bạn cần vì server cung cấp kernel
+ Điều khác biệt của contaienr vs virtual machine đó chính là nó không dựng HĐH đầy đủ như virtual machine.
- Sử dụng lệnh : docker image history ${imageName}
+ Lệnh này không phải để dùng show lịch sử  thay đổi của image, nói chính xác đây là lịch sử thay đổi của các lớp trong một image,

+ Image layers là gì ? cần chú ý vì đây là khái niệm cơ bản của docker
+ Image layers sử dụng một thứ được gọi là union file system để trình bày một loại các thay đổi của hệ thống tệp như một hệ thống file thực tế
+ history and inspect commands (chúng ta sẽ đi sâu vào lịch sử và lệnh inspect để có thể sử dụng chúng hiểu Image được tạo ra bằng cái gì ?)

+ Tìm hiểu concept "copy on write" từ đó hiểu cách chạy của container như một layer addtional trên đầu của image

- Sử dụng lệnh docker image history ${imageName:version}
+ được dùng để hiển thị histotr của  layers image (hiển thị các lớp của chế độ thay đổi Image) , nôm na là hiển thị các lớp
=> Mỗi hình ảnh bắt đầu với một layer trống gọ i là blank layer, mỗi lớp sẽ có một SHA (unique) để giúp hệ thống xác định
=> Sau đó mỗi thay đổi trên hệ thống tệp của image được gọi là layer
+ Bạn sử dụng hình ảnh và bạn nên biết rằng image không phải là một số lượng lớn dữ liệu đến trong một khối lớn.
+ Hãy tưởng tượng image như một tập hợp các lớp
- Lớp dưới cùng là blank layer
- Mỗi thay đổi trên image sẽ tạo ra một lớp bao phủ lên image
- Điều hay của image đó là nó có khả năng tái sử dụng lại, docker sẽ dựa vào SHA để kiểm tra xem layer đó (SHA) đã được tạo hay chưa rồi mới quyết định tải nó. Tóm lại chúng ta không bao giờ lưu 2 Layer Image giống nhau, 

Ví dụ : Giả sử chúng ta có Apache Image và chúng ta muốn chạy một container trên Apache Image thì tất cả những gì docker làm là tạo ra một Layer read and write cho container đó trên đầu (top) của Image, nếu chúng ta tạo một container thứ 2 (đương nhiên lúc này nó lại ở trên đầu của container thứ nhất) thì sự khác biết giữa 2 container này chỉ là chúng đọc dữ liệu từ Image như thế nào mà thôi.
=> Khi bạn chạy container về cơ bản bạn đang thay đổi tệp chạy container đó trong Image điều này được gọi là copy on write
=> File system sẽ lấy tệp tin trong Image (dùng để chạy container) và copy 
=> Container đơn giản chỉ là một quá trình (process) và những tệp khác của Image

- Một image bao gồm 3 phần là BinaryData, Dependency và meta của nó
- Sử dụng docker image inspect ${imageName} điều này về cơ bản cung cấp thông tin cho chúng ta về hình ảnh như metadata, tag, idImage...
















































Image Tagging and Pushsing to Docker Hub
Hãy chú ý rằng tag lastes không có nghĩa rằng nó là Image mới nhất đó chỉ là thẻ mặc định, chủ sở hữu hình ảnh (owner image) nên gán nó cho phiên bản ổn định mới nhất
- Sử dụng lệnh : docker image push 
+ Tải lên các layer bạn đã thay đổi để đăng kí hình ảnh.
+ Để upload layler lên bạn cần phải login bằng lệnh: docker login






























Building Images
The dockerfile basics
docker build -f some-dockerfile
Cho đến nay tất cả các Docker Image mà chúng ta sử dụng đều được xây dựng từ Dockerfile chúng ta có thể nhìn thấy chúng trên DockerHub
- Dockerfile chính là hướng dẫn mà để chúng ta xây dựng nên Image của riêng chúng ta.
Hãy quan sát trong một file docker (Dockerfile)
- FROM Đâu tiên là FROM nó sẽ yêu cầu một bản phân phối linux có trường hợp là debian có trường hợp là alpine
- ENV : ENV dành cho các biến môi trường, nó dùng để  thiết lập các biến môi trường một điều đặc biệt quan trọng trong các container bởi vì chúng là cách chính để chúng ta có thể set key/value cho việc xây dựng container và chạy container.
VD hãy nhìn trong Dọckerfile của thư mục docker-sample-1, sau ENV chúng ta thiết lập key/value cho nginx,njs-version
Một lý do khiến chúng được chọn là cách ưa thích để thêm khóa / giá trị là chúng hoạt động ở mọi nơi, trên mọi hệ điều hành và cấu hình
- RUN : ghi lại log của container
- EXPOSE : khi chúng ta chạy conainer theo mặc định sẽ không có port (TCP hoặc UDP) nào được mở, nó sẽ không phơi bày bất cứ thừ gì từ container ra virtual network nếu chúng ta không setup port cho nó (điều này đã được đề cập đến ở phần trên) trong trường hợp này ta setup 80 443


- Tiếp tục nhìn vào file Dockerfile (dockerfile-sample-1) mỗi phần (nói dễ hiều hơn là khổ) của file thực chất đều là một layer của Image (điều này đã nói ở phần layer cần liên hệ) vì vậy thứ tự của chúng thực sự quan trọng vì nó chạy từ trên xuống dưới. điều này thực sự quan trọng 
- Chú ý nữa rằng nếu bạn muốn xuống dòng ở một khổ bạn cần sử dụng keywork "\&"

