#include <iostream>
#include <fstream>
#include <iomanip>

int main(int argc, char** argv){
  std::ifstream ifs(argv[1], std::ios::in | std::ios::binary);
  std::ofstream ofs("sort.dat", std::ios::out);

  ifs.seekg(0, std::ios::end);
  auto eofpos = ifs.tellg();
  ifs.clear();
  ifs.seekg(0, std::ios::beg);
  auto begpos = ifs.tellg();
  auto size = eofpos - begpos;
  int type_size = sizeof(float);
  auto data_number = size / type_size;

  ofs << std::setprecision(3);

  ifs.clear();
  ifs.seekg(0, std::ios::beg);

  float temp[2][256];
  auto count = 0;
  while(count < data_number){
    for(int i = 0;i < 2;i++){
      for(int j = 0;j < 256;j++){
	temp[i][j] = 0.0;
      }
    }

    for(int i = 0;i < 2;i++){
      for(int j = 0;j < 256;j++){
	ifs.read((char*)&temp[i][j], type_size);
	count++;
      }
    }
    for(int i = 0;i < 128;i++){
      ofs << (temp[0][i*2]+temp[0][i*2+1]+temp[1][i*2]+temp[1][i*2+1])/4.0 << "," << std::endl;
    }
    if(count%10000 == 0){
      std::cout << "write: " << ((float)count / data_number)*100.0 << "%" << std::endl;
    }
  }
  
  ifs.close();
  ofs.close();
  return 0;
}
